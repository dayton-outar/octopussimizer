# API

## Requirements

 * [.NET 5](https://dotnet.microsoft.com/download/dotnet/5.0)
 * [Entity Framework](https://docs.microsoft.com/en-us/ef/)
 * [Hot Chocolate](https://chillicream.com/docs/)

## Notes
Credit to [How to Use .NET Core CLI to Create a Multi-Project Solution](https://www.skylinetechnologies.com/Blog/Skyline-Blog/February_2018/how-to-use-dot-net-core-cli-create-multi-project) by Ben Buhr

The -o parameter lets you specify the output directory (which will get created in case it doesn’t exist). Once that command finishes, navigate into the folder and then execute the following commands:

[dotnet sln](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-sln)

```bash
dotnet new sln -o Harpoon
```

```bash
dotnet new classlib -o api/O8Query
```

```bash
dotnet new webapi -o api/Harpoon
```

```bash
dotnet sln Harpoon.sln add api/Harpoon/Harpoon.csproj api/O8Query/O8Query.csproj
```

```bash
dotnet build O8Query/O8Query.csproj
```

```bash
dotnet run -p api/Harpoon.csproj
```

```bash
dotnet publish api/Harpoon.csproj -o ../build -c Release
```

[dotnet add package](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-add-package)

```bash
dotnet add package Newtonsoft.Json
```

```bash
dotnet add ToDo.csproj package Microsoft.Azure.DocumentDB.Core -v 1.0.0
```

```bash
dotnet add package Microsoft.AspNetCore.StaticFiles -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
```

[dotnet add reference](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-add-reference)

```bash
dotnet add app/app.csproj reference lib/lib.csproj
```


## Using EF Core CLI

[Entity Framework Core tools reference - .NET Core CLI](https://docs.microsoft.com/en-us/ef/core/cli/dotnet)

[Migrations Overview](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)

[Create and Drop APIs](https://docs.microsoft.com/en-us/ef/core/managing-schemas/ensure-created)

Inside Data Library
```bash
dotnet ef migrations add InitialCreate
```

Apply migration to database
```bash
dotnet ef database update
```
## GraphQL

Navigate to https://localhost:5001/graphql/ to get GraphQL endpoint

[Getting started with Hot Chocolate](https://chillicream.com/docs/hotchocolate/get-started)

[Get started with Hot Chocolate and Entity Framework](https://www.softwareis.cool/hotchocolate-and-efcore/)


Below query get first 10 from descending order of complete list in database

```graphql
{
  stockTradings(order: {date: DESC}) {
    nodes {
      security {
        code,
        security
      },
      volume,
      priceChange,
      percentage,
      date
    }
  }
}
```

Get the latest 50 stocks with code `bil` and `mil` that were traded recently

```graphql
query {
  stockTradings(
    first: 50
    where: { or: [{ security: { code: { eq: "bil" } } }, { security: { code: { eq: "mil" } } }] }
    order: {date: DESC}
  ) {
    edges {
      node {
        security {
          code,
          security
        },
        volume,
        priceChange,
        percentage,
        date
      }
    }
  }
}
```

```graphql
query {
  companies (
    order: { security: ASC}
    
  ) {
    edges {
      node {
        code,
        security,
        created
      }
    }
  }
}
```

Learnt about paging for Hot Chocolate [here](https://github.com/ChilliCream/hotchocolate/issues/2181)

Trying to create query good for UI table paging through content

```gql
query {
  stockTradings(
    first: 10
    where: { or: [{ security: { code: { eq: "bil" } } }, { security: { code: { eq: "mil" } } }] }
    order: {date: DESC}
  ) {
    edges {
      cursor
      node {
        security {
          code,
          security
        },
        volume,
        priceChange,
        percentage,
        date
      }
    }
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Moving to next page

```gql
query {
  stockTradings(
    first: 10
    after: "MTk="
    where: { or: [{ security: { code: { eq: "bil" } } }, { security: { code: { eq: "mil" } } }] }
    order: {date: DESC}
  ) {
    edges {
      cursor
      node {
        security {
          code,
          security
        },
        volume,
        priceChange,
        percentage,
        date
      }
    }
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Had to add [UseProjections] to get totalCount. Documentation on ChilliCream not very friendly

Querying GetTotalTrades is queried as shown below

```gql
query {
  totalTrades
  (
    companyCode: ""
    begin: "2021-05-03T00:00:00.0000000Z"
    end: "2021-06-03T00:00:00.0000000Z") {
    code,
    security,
    volume,
    openingDate,
    openingPrice,
    closingDate,
    closingPrice,
    percentage
  }
}
```

## Further Reading

1. [ASP.NET Core Fundamentals](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/?view=aspnetcore-5.0&tabs=linux)
2. [Entity Framework](https://entityframework.net/)
3. [Data Seeding](https://docs.microsoft.com/en-us/ef/core/modeling/data-seeding)
4. [Calling Stored Procedures with the Entity Framework in .NET 5](https://www.codemag.com/Article/2101031/Calling-Stored-Procedures-with-the-Entity-Framework-in-.NET-5)
5. [Fixing Entity Framework Validation 30000 No Type Specified for the Decimal Column](https://mattferderer.com/entity-framework-no-type-was-specified-for-the-decimal-column) by Matt Ferderer
6. [SQL Server Table-valued Functions](https://www.sqlservertutorial.net/sql-server-user-defined-functions/sql-server-table-valued-functions/)
7. [.NET 5 - GraphQL Example](https://github.com/binarythistle/S04E01---.NET-5-GraphQL-API)
8. [Entity Framework Core: Show Parameter Values in Logging](https://elanderson.net/2019/03/entity-framework-core-show-parameter-values-in-logging/)
9. [How do you show underlying SQL query in EF Core?](https://stackoverflow.com/questions/45893732/how-do-you-show-underlying-sql-query-in-ef-core)
10. [GraphQL Workshop](https://github.com/ChilliCream/graphql-workshop)
11. [Stored Procedure in Entity Framework Core Migrations](https://dotnetthoughts.net/creating-stored-procs-in-efcore-migrations/)
12. [Code-First Stored Procedure Entity Framework 6.0](https://www.c-sharpcorner.com/UploadFile/ff2f08/code-first-stored-procedure-entity-framework-6-0/?) by Jignesh Trivedi
13. [Working with Stored Procedure in Entity Framework Core](https://www.entityframeworktutorial.net/efcore/working-with-stored-procedure-in-ef-core.aspx)
14. [Using the FOR XML Clause to Return Query Results as XML](https://www.red-gate.com/simple-talk/sql/learn-sql-server/using-the-for-xml-clause-to-return-query-results-as-xml/) by Robert Sheldon
15. [XML columns in a Code-First application](https://stackoverflow.com/questions/12631290/xml-columns-in-a-code-first-application) - StackOverflow
16. [NUnit vs. XUnit vs. MSTest: Comparing Unit Testing Frameworks In C#](https://www.lambdatest.com/blog/nunit-vs-xunit-vs-mstest/) by Himanshu Sheth