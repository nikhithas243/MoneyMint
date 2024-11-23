const express = require('express');
const { exec } = require('child_process');
const app = express();

const runShiny = () => {
    const rScriptPath = 'D:/Mini Project/MoneyMint/src/layouts/billing/components/Button/calci.R'; // Corrected path with forward slashes
    const port = 64861;

    const shinyApp = exec(`Rscript -e "shiny::runApp('${rScriptPath.replace(/\\/g, '\\\\')}', port=${port}, launch.browser=FALSE)"`);

    shinyApp.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
    });

    shinyApp.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
    });

    shinyApp.on('close', code => {
        console.log(`child process exited with code ${code}`);
    });
};

app.get('/run-shiny', (req, res) => {
    runShiny();
    res.send('R script is running, check console logs for details.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
