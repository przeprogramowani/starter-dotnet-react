# FlashCards (.NET + React)

## Pre-requisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/en-us/download)
- Node.js 20+
- (Optionally) VS Code [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- (Optionally) SQLite Viewer [Extension](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)

### Dev Addons

```bash
brew install sqlite3 # or platform-specific alternative
dotnet tool install --global dotnet-ef
```

## Getting Started

1. Clone the repository
2. In FlashcardsUI run `npm install && npm run build`
3. In FlashcardsAPI run `dotnet restore && dotnet build`

## Local Development

You can use built-in launch config for VS Code or run the following commands in two separate terminals:

1. In FlashcardsAPI run `dotnet watch run` (localhost:3001)
2. In FlashcardsUI run `npm start` (localhost:3000)
