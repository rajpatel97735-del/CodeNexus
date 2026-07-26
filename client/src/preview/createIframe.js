export default function createIframe(html) {

    return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
/>

${html}

</head>

<body></body>

</html>
`;

}