FROM golang:1.22.4 as build
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . /app

RUN go build -o api-server .


EXPOSE 4000

CMD ["./api-server"]
