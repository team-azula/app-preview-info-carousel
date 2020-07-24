FROM golang:1.14-alpine AS build

WORKDIR /src/
COPY ./ /src/
RUN CGO_ENABLED=0 go build -o /carouselServer cmd/server/main.go

FROM scratch
COPY --from=build /carouselServer /carouselServer
ENTRYPOINT [ "/carouselServer" ]

