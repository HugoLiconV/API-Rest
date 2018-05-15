# api-rest Job Board v1.0.0

API REST con NodeJS y Express

- [Article](#article)
	- [Create article](#create-article)
	- [Delete article](#delete-article)
	- [Retrieve article](#retrieve-article)
	- [Retrieve articles](#retrieve-articles)
	- [Update article](#update-article)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Company](#company)
	- [Retrieve companies](#retrieve-companies)
	- [Retrieve company](#retrieve-company)
	- [Update company](#update-company)
	
- [Opening](#opening)
	- [Create opening](#create-opening)
	- [Delete opening](#delete-opening)
	- [Retrieve company&#39;s openings](#retrieve-company&#39;s-openings)
	- [Retrieve opening](#retrieve-opening)
	- [Retrieve openings](#retrieve-openings)
	- [Update opening](#update-opening)
	
- [Student](#student)
	- [Retrieve student](#retrieve-student)
	- [Retrieve students](#retrieve-students)
	- [Update student](#update-student)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Article

## Create article



	POST /articles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>Article's title.</p>							|
| content			| 			|  <p>Article's content.</p>							|

## Delete article



	DELETE /articles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve article



	GET /articles/:id


## Retrieve articles



	GET /articles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update article



	PUT /articles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>Article's title.</p>							|
| content			| 			|  <p>Article's content.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Company

## Retrieve companies



	GET /companies


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve company



	GET /companies/:id


## Update company



	PUT /companies/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| String			| **optional** <p>Company name.</p>							|
| rfc			| String			| **optional** <p>Company rfc.</p>							|
| razon			| String			| **optional** <p>Razón Social de la compañia.</p>							|
| description			| String			| **optional** <p>Company description.</p>							|

# Opening

## Create opening



	POST /openings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| String			|  <p>Opening title.</p>							|
| location			| Object			| **optional** <p>Opening location.</p>							|
| location.city			| String			|  <p>Opening city</p>							|
| location.state			| String			|  <p>Opening state</p>							|
| salary			| String			| **optional** <p>Opening salary.</p>							|
| date			| Date			| **optional** <p>Opening date.</p>							|
| description			| String			|  <p>Opening description.</p>							|
| carreer			| [String]			|  <p>Carreers required for the opening.</p>							|

## Delete opening



	DELETE /openings/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve company&#39;s openings



	GET /openings/my-openings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve opening



	GET /openings/:id


## Retrieve openings



	GET /openings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update opening



	PUT /openings/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>Opening's title.</p>							|
| location			| 			|  <p>Opening's location.</p>							|
| salary			| 			|  <p>Opening's salary.</p>							|
| date			| 			|  <p>Opening's date.</p>							|
| description			| 			|  <p>Opening's description.</p>							|
| carreer			| 			|  <p>Opening's carreer.</p>							|

# Student

## Retrieve student



	GET /students/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve students



	GET /students


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update student



	PUT /students/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| genre			| String			| **optional** <p>User's role.</p>							|
| education			| Object			| **optional** <p>User's education.</p>							|
| education.degree			| String			|  <p>User's degree.</p>							|
| education.date			| String			| **optional** <p>Date of admision - date of egress</p>							|
| education.grade			| String			| **optional** <p>User's grade</p>							|
| skills			| String[]			|  <p>User's skills</p>							|
| achievements			| Object[]			|  <p>User's achievements</p>							|
| achievements.title			| String			|  <p>Achievement title.</p>							|
| achievements.description			| String			|  <p>Achievement description</p>							|
| achievements.date			| String			|  <p>Achievement date</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|
| phone			| String			|  <p>User's phone</p>							|
| address			| Object			|  <p>User's address</p>							|
| address.city			| String			|  <p>User's city</p>							|
| address.state			| String			|  <p>User's state</p>							|
| kind			| String			|  <p>User's kind</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| phone			| String			|  <p>User's phone</p>							|
| address			| Object			|  <p>User's address</p>							|
| address.city			| String			|  <p>User's city</p>							|
| address.state			| String			|  <p>User's state</p>							|


