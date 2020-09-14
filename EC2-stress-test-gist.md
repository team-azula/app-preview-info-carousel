# EC2 Proxy/Service Testing Results

## Proxy setup
> node proxy endpoint: 18.217.88.59:3000/carousels/{id}
>
> route to golang service: 18.219.219.202:8000/carousels/{id}
>
> ```javascript
> sample output: [{
>   "app_id": "9999036",
>   "preview_data": {
>     "images": [
>       "https://media.gettyimages.com/photos/building-a-tree-house-with-my-grandfather-picture-id950589524?k=6\u0026m=950589524\u0026s=612x612\u0026w=0\u0026h=Xt3X1WyMjP60f-ZLbeFXavmR5NbE0HRb6l8Dh8gWCEw=",
>       "https://media.gettyimages.com/photos/illuminated-treehouse-in-backyard-at-night-picture-id182938932?k=6\u0026m=182938932\u0026s=612x612\u0026w=0\u0026h=9OkREtQno4iS1ZP4gdTpUgKWiqbZ8iIl77tYykI681E=",
>       "https://media.gettyimages.com/photos/brothers-picture-id165952122?k=6\u0026m=165952122\u0026s=612x612\u0026w=0\u0026h=CvNYWmGdnpwM7Fh7_OwOEAGLuZcs4T_kqEj5psBa5mU=",
>       "https://media.gettyimages.com/photos/cheerful-woman-relaxing-on-patio-over-the-jungle-thailand-picture-id910778374?k=6\u0026m=910778374\u0026s=612x612\u0026w=0\u0026h=VEjQ93xM6qcjCbVrOQWfp3Aipyuf4EACGS9wj7gSoYo=",
>       "https://media.gettyimages.com/photos/low-angle-view-of-tree-house-against-sky-during-sunset-picture-id580825907?k=6\u0026m=580825907\u0026s=612x612\u0026w=0\u0026h=YKvMPdfLxevkXmPEdEyi0KpKHhV_9s8ox95S0siMWvY=",
>       "https://media.gettyimages.com/photos/the-huddled-rooftops-the-sprawling-streets-green-trees-and-flats-picture-id909056132?k=6\u0026m=909056132\u0026s=612x612\u0026w=0\u0026h=E4vbJdQ-GF93s3MMaSMun1HyRzSxWirxLZ7vnrOkHBI=",
>       "https://media.gettyimages.com/photos/mid-adult-man-building-wooden-tree-house-picture-id696935832?k=6\u0026m=696935832\u0026s=612x612\u0026w=0\u0026h=ADzezz8VtBJS7mp7qga2mi0b1CaDMrXUbrEDtpzECPY=",
>       "https://media.gettyimages.com/photos/smiling-boy-sitting-in-tree-house-at-forest-picture-id800406862?k=6\u0026m=800406862\u0026s=612x612\u0026w=0\u0026h=viX5w4P56IUQBylpNpRuxkEm9ciOlj8GIkM0Qd_QaE8="
>     ],
>   "app_description": "Sint aut mollitia atque sunt doloremque cum numquam. Blanditiis voluptas dolor. Sequi dolores delectus. Fugit ut voluptates et facilis corporis velit eum. Quia repellendus illum id ad est. Non eveniet culpa est ullam tempore vitae aliquam.",
>   "additional_text": "Dolores rerum odio delectus omnis sunt quis debitis quia et. Delectus voluptas sint veritatis ut qui consequatur eum. Veritatis fugiat aliquid harum perferendis ea qui quia hic molestiae. Est tempora et quae autem eligendi pariatur. Rerum eos vitae omnis est aperiam ut quae."
>   }
> }];
> ```


## Stress Test
### 250 concurrent requests for 5 minutes, powered by Siege, from t2.micro instance. "id" route parameter randomized from 9,999,000 to 9,999,999.
> __node server --> postgres__
> > total transactions: 101,936
> >
> > transactions/second: 339.87
> >
> > transaction success: 100%
> >
> __node proxy --> golang server --> postgres__
> > total transactions: 140,475
> >
> > transactions/second: 468.86
> >
> > transactions success: 100%
> >
> __golang server --> postgres__
> > total transactions: 525,349
> >
> > transactions/second: 1,756.49
> >
> > transaction success: 100%

## Visuals
#### The image below shows the stress test results on a single node server on a t2.micro instance. The blue block shows the percentage of time the request was being processed by node. The sliver of orange at the top of the graph shows the amount of time the request was being processed by postgres.
![Imgur](https://i.imgur.com/zDUO5cJ.png)
![Imgur](https://i.imgur.com/wM3FxdL.png)
#### The image below shows the stress test results on a node proxy server deployed on a t2.micro instance which re-routes the request to a golang server (also on a t2). The blue block represents the time each request was spent in the node server. The green block represents the time it took for golang to process the request, query postgres, and return the request.
![Imgur](https://i.imgur.com/357rl0M.png)
#### Below is the output from siege after running two separate stress tests. The first test was to the node proxy server, which passed the request to a golang server. The second test sent requests straight to the golang server.
![Imgur](https://i.imgur.com/mTYsHeE.png)

## Analysis
#### Golang processes seem to consistantly quadruple the performance of node processes.