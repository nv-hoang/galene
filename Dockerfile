FROM golang:latest

# Set working directory
WORKDIR /app

RUN apt-get update && \
    apt-get install -y

# Copy source code
COPY . .

# Install dependencies
RUN go mod download
RUN CGO_ENABLED=0 go build -ldflags='-s -w'

# Expose the application port
EXPOSE 8443
EXPOSE 1194

CMD ["./galene", "-turn=192.168.1.7:1194"]
