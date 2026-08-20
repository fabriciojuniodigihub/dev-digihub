# Configurar o notebook da empresa

A ideia é instalar o mínimo na mão e deixar o Claude Code fazer o resto.

## O mínimo, na mão

**1. Node.js.** Baixa o LTS em [nodejs.org](https://nodejs.org) e instala. É o que roda o
Claude Code.

**2. Git.** [git-scm.com](https://git-scm.com/download/win). Deixa marcado o Git Bash na
instalação, porque o Claude Code usa.

**3. Claude Code.**

```
npm install -g @anthropic-ai/claude-code
```

**4. VS Code.** [code.visualstudio.com](https://code.visualstudio.com), com a opção de
adicionar ao PATH marcada.

## O resto, pelo Claude Code

Clona o repositório e abre o Claude Code dentro dele:

```
git clone https://github.com/fabriciojuniodigihub/<repo>.git dev_digihub
cd dev_digihub
claude
```

Aí é só pedir:

> roda o pessoal/configurar-notebook.ps1

O script instala o Scoop e, por ele, Git, Node, Python, gh, 7zip, ffmpeg, JDK 21, Maven,
PHP 8.3, Composer, PostgreSQL e WinSCP. Depois instala os pacotes Python que a gente usa, as
extensões do VS Code e configura a identidade do Git.

## O que o script não faz, e por quê

**VPN.** Instalar o cliente OpenVPN e pedir o arquivo `.ovpn` ao Maycon. Sem a VPN não tem
banco, não tem servidor e não tem GitLab.

**Entrada no `hosts`.** O `git.lecom.com.br` só existe no DNS interno da Lecom e aponta para
`192.168.3.50`. Precisa de PowerShell como administrador:

```powershell
Add-Content -Path "$env:SystemRoot\System32\drivers\etc\hosts" -Value "192.168.3.50`tgit.lecom.com.br"
```

**Autenticações**, porque abrem navegador:

```
gh auth login
```

com a conta `fabriciojuniodigihub`. E dentro do Claude Code, `/mcp` para conectar o Atlassian,
lembrando de entrar com **atendimento@digihub.com.br** e não com a conta pessoal. Sair da
Atlassian no navegador antes, senão ele reaproveita a sessão.

**Aplicativos de janela.** Chrome, Teams, Outlook e o Roberty Studio.

**A pasta `material/`.** Ela está no `.gitignore` e não vem no clone. Copia da máquina antiga,
é onde ficam os acessos dos clientes e o material de treinamento.

## Conferir se ficou tudo certo

```
git --version && node --version && python --version && java -version && ffmpeg -version | head -1
python -c "import pymysql, openpyxl, paramiko, reportlab, faster_whisper; print('pacotes ok')"
```

E o teste que prova que o ambiente inteiro funciona, porque depende de VPN, banco e credencial:

```
cd clientes/lecom
python -c "import sys; sys.path.insert(0,'.'); print('ok')"
```

Na prática, o melhor teste é pedir para o Claude Code rodar uma consulta simples no banco da
Lecom. Se responder, VPN, credencial e Python estão de pé.

## Detalhe da GPU

Se o notebook tiver placa NVIDIA, a transcrição de reunião roda nela. O script já instala o
`nvidia-cublas-cu12` e o `nvidia-cudnn-cu12`. O passo a passo e a pegadinha das DLLs estão em
[notas/transcrever-reuniao.md](../notas/transcrever-reuniao.md).

Se não tiver placa, a transcrição cai para o processador e fica lenta. Nesse caso vale
transcrever pelo próprio Teams e só trazer o arquivo.
