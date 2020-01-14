module.exports = function(content){
    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>CRUD</title>
        <style>
        *{
            box-sizing: border-box;
            font-family: monospace;
            margin:0;
            padding: 0;
        }
        header, main{
            padding: 3%;
            min-height: 20vh;
        }
    
        </style>
    </head>
    <body>
        <header>
            <a href="/">Show all Guitars</a> |
            <a href="/create">Create Guitar</a> |
    
        </header>
        <main>
            ${content}
        </main>
    </body>
    </html>
    
    `;
}