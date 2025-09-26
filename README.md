# Public-Service-Portal
# Sarkari Sathi Backend

This is the C++ backend implementation for the Sarkari Sathi government services portal.

## Prerequisites

- CMake (version 3.10 or higher)
- C++ compiler with C++17 support
- cpprestsdk (C++ REST SDK)

## Installation

### Windows

1. Install vcpkg (C++ package manager):
```powershell
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
```

2. Install cpprestsdk:
```powershell
.\vcpkg install cpprestsdk:x64-windows
```

3. Integrate vcpkg with Visual Studio:
```powershell
.\vcpkg integrate install
```

### Linux

1. Install dependencies:
```bash
sudo apt-get update
sudo apt-get install libcpprest-dev
```

## Building the Project

1. Create a build directory:
```bash
mkdir build
cd build
```

2. Configure and build:
```bash
cmake ..
cmake --build .
```

## Running the Server

After building, run the server:
```bash
./sarkari_sathi_server
```

The server will start listening at `http://localhost:8080/api`

## API Endpoints

- GET `/api/services` - Get all services
- GET `/api/services/{id}` - Get a specific service
- POST `/api/services` - Create a new service

## Example API Usage

### Get all services
```bash
curl http://localhost:8080/api/services
```

### Get a specific service
```bash
curl http://localhost:8080/api/services/1
```

### Create a new service
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"New Service","category":"documents","description":"New service description"}' http://localhost:8080/api/services
``` 
