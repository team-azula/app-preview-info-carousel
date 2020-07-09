# app-preview-info-carousel

> This module includes the image carousel including various views of each app as well as the app description paragraph(s)

# API

## endpoints:
* **GET: *'/carousels/:id'***
```
{
    "images": [
        "https://i.picsum.photos/id/737/180/300.jpg",
        "https://i.picsum.photos/id/447/300/300.jpg",
        "https://i.picsum.photos/id/446/180/300.jpg"
    ],
    "app_description": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "additional_text": "XXXXXXXXXXXXXXXXXXXXXXXXxx"
}
```
* **POST: *'/carousels'***
```*
body:
{
    "images": [
        "https://i.picsum.photos/id/737/180/300.jpg",
        "https://i.picsum.photos/id/447/300/300.jpg",
        "https://i.picsum.photos/id/446/180/300.jpg"
    ],
    "app_description": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "additional_text": "XXXXXXXXXXXXXXXXXXXXXXXXxx"
}
```
* **PUT: *'/carousels/:id'***
* **DELETE: *'/carousels/:id'***


## Related Projects

  - https://github.com/FEC-Group-Link/app-info-logistics-component
  - https://github.com/FEC-Group-Link/searchbar-similar.git
  - https://github.com/FEC-Group-Link/review-component
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

>   "scripts": {
    "start": "nodemon server/index.js",
    "build": "webpack -d --watch",
    "db:setup": "node database/seed.js",
    "test": "jest"
  },

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```