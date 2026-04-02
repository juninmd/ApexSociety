# Deploy Web (Netlify e GitHub Pages)

A aplicação já está devidamente configurada para ser disponibilizada via **Netlify** e **GitHub Pages**.

Para visualizar o aplicativo imediatamente na web, acesse os seguintes links:
- **Netlify**: [https://apexsociety.netlify.app/](https://apexsociety.netlify.app/)
- **GitHub Pages**: [https://apexsociety.github.io/apexsociety/](https://apexsociety.github.io/apexsociety/)

## Como o Deploy Automático Funciona?

O repositório conta com dois arquivos de Github Actions que realizam o processo automaticamente:
1. `.github/workflows/deploy.yml` (Para o GitHub Pages)
2. `.github/workflows/netlify.yml` (Para o Netlify)

Sempre que você realizar um **commit e push** na branch `main` contendo as alterações recentes do projeto (como melhorias de segurança e atualização dos metadados), a infraestrutura do GitHub irá:
1. Executar os testes automatizados.
2. Rodar a verificação de código (`lint` e `type-check`).
3. Compilar a versão otimizada para web (`pnpm run build:web`).
4. Publicar automaticamente os novos artefatos nos links listados acima.

Não é necessária nenhuma ação manual para disponibilizar a versão atualizada além do push.