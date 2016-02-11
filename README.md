# favourite-programming-language (fpl-github)
Given a GitHub user, get his favourite programming language based on his public repositories.

## How to install

Install as a global package
```sh
npm install fpl-github -g
```


## Usage

```sh
fpl <github username>
```
Note:
   In order to avoid GitHub rates limits constraints, there is a default GitHub app created for testing purposes.
   However to use this app is required to create a own GitHub app. 
   To use this app you have to set 2 env vars **`GITHUB_APP_KEY`** and **`GITHUB_APP_SECRET`** 

## Scripts

#### Testing & coverage

To test:
```sh
npm test
```

To get coverage information
```sh
npm run coverage
```

#### Code style
```sh
npm run eslint
```
