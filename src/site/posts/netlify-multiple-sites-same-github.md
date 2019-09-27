Currently that’s not possible, though it might be with github actions, it’s not something that we natively support. One option that you have is to filter your webhooks using a lambda function. Have github send the webhook to the function, then in the function you can parse the payload and then decide whether or not to trigger the build from there.

# A little bit of context

# Webhooks

GitHub Actions

Webhooks allow you to build or set up integrations,
subscribe to certain events on GitHub.com. When one of those events is triggered, we'll send a HTTP POST payload to the webhook's configured URL. Webhooks can be used to update an external issue tracker, trigger CI builds, update a backup mirror, or even deploy to your production server. You're only limited by your imagination.

push 	Triggered on a push to a repository branch. Branch pushes and repository tag pushes also trigger webhook push events. This is the default event.

# Serverless Lambda Functions

"Serverless is a buzzword, getting popular and gaining a lot of traction lately over the last few years.

It doesn't mean that applications suddenly don't need servers to run on, or magically run in the ether
or so-called cloud

the running joke 
'The cloud is just someone else's computer'

https://blogs.cisco.com/cloud/cloud-the-truth-is-out-there

"The objective is to simply optimize your business and make better use of technology."

It means that **you** don't manage the server
managing a production server can get messy

run different server side tasks service and functions (FaaS)

Powered by AWS Lambda

Lambda functions allow us tu run server-side tasks without having to manage a server

AWS can be an overcomplicated for small to medium applications."