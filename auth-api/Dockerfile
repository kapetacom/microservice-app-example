FROM golang:1.21.6

EXPOSE 8081

WORKDIR /go/src/app

COPY . .

RUN go mod tidy

RUN go build -o auth-api

CMD /go/src/app/auth-api

