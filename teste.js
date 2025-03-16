const fs = require('fs');
const path = require('path');

// Caminho para o arquivo .txt
const filePath = path.join(__dirname, './lib/lista.txt');

// Função para ler e modificar o conteúdo do arquivo
function processFile() {
    // Lê o arquivo
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        // Substitui ", " por "\n" (quebra de linha)
        const modifiedData = data.replace(/, /g, '\n');

        // Exibe o conteúdo modificado no console
        console.log(modifiedData);

         //Se você quiser salvar em um novo arquivo, descomente as linhas abaixo
         const outputFilePath = path.join(__dirname, 'arquivo_modificado.txt');
         fs.writeFile(outputFilePath, modifiedData, (err) => {
             if (err) {
                 console.error('Erro ao salvar o arquivo:', err);
             } else {
                 console.log('Arquivo salvo com sucesso em', outputFilePath);
             }
         });
    });
}

// Chama a função
processFile();
