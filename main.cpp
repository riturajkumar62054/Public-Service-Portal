#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

// Service data structure
struct Service {
    std::string id;
    std::string name;
    std::string category;
    std::string description;
};

// In-memory database for services
std::vector<Service> services = {
    {"1", "Aadhaar Card", "documents", "Apply for or update your Aadhaar card"},
    {"2", "Scholarship", "education", "Apply for educational scholarships"},
    {"3", "Health Insurance", "healthcare", "Register for health insurance"}
};

// Handle GET request for all services
void handle_get_services(http_request request) {
    json::value response;
    json::value services_array = json::value::array();
    
    for (size_t i = 0; i < services.size(); ++i) {
        json::value service;
        service["id"] = json::value::string(services[i].id);
        service["name"] = json::value::string(services[i].name);
        service["category"] = json::value::string(services[i].category);
        service["description"] = json::value::string(services[i].description);
        services_array[i] = service;
    }
    
    response["services"] = services_array;
    request.reply(status_codes::OK, response);
}

// Handle GET request for a specific service
void handle_get_service(http_request request) {
    auto path = request.relative_uri().path();
    auto id = path.substr(path.find_last_of('/') + 1);
    
    for (const auto& service : services) {
        if (service.id == id) {
            json::value response;
            response["id"] = json::value::string(service.id);
            response["name"] = json::value::string(service.name);
            response["category"] = json::value::string(service.category);
            response["description"] = json::value::string(service.description);
            request.reply(status_codes::OK, response);
            return;
        }
    }
    
    request.reply(status_codes::NotFound);
}

// Handle POST request to create a new service
void handle_post_service(http_request request) {
    request.extract_json().then([=](json::value request_json) {
        try {
            Service new_service;
            new_service.id = std::to_string(services.size() + 1);
            new_service.name = request_json["name"].as_string();
            new_service.category = request_json["category"].as_string();
            new_service.description = request_json["description"].as_string();
            
            services.push_back(new_service);
            
            json::value response;
            response["id"] = json::value::string(new_service.id);
            response["message"] = json::value::string("Service created successfully");
            request.reply(status_codes::Created, response);
        }
        catch (const std::exception& e) {
            request.reply(status_codes::BadRequest, json::value::string("Invalid request format"));
        }
    });
}

int main() {
    http_listener listener("http://localhost:8080/api");
    
    // Set up request handlers
    listener.support(methods::GET, [](http_request request) {
        auto path = request.relative_uri().path();
        if (path == "/api/services") {
            handle_get_services(request);
        } else if (path.find("/api/services/") == 0) {
            handle_get_service(request);
        } else {
            request.reply(status_codes::NotFound);
        }
    });
    
    listener.support(methods::POST, [](http_request request) {
        auto path = request.relative_uri().path();
        if (path == "/api/services") {
            handle_post_service(request);
        } else {
            request.reply(status_codes::NotFound);
        }
    });
    
    try {
        listener.open().wait();
        std::cout << "Server is listening at http://localhost:8080/api" << std::endl;
        
        // Keep the server running
        std::string line;
        std::getline(std::cin, line);
        
        listener.close().wait();
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
} 