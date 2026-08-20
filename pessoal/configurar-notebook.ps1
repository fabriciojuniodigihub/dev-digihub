# Prepara a maquina de trabalho da Digihub.
# Rodar no PowerShell como usuario normal, nao precisa de administrador.
# O que exige admin ou navegador esta listado no final e nao e feito aqui.

$ErrorActionPreference = "Stop"

function Passo($texto) { Write-Host "`n=== $texto" -ForegroundColor Cyan }
function Ok($texto)    { Write-Host "    $texto" -ForegroundColor DarkGray }

# ------------------------------------------------------------------ scoop
Passo "Scoop, gerenciador de pacotes"
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
} else { Ok "ja instalado" }

scoop bucket add main     2>$null
scoop bucket add java     2>$null
scoop bucket add versions 2>$null

# ------------------------------------------------------------------ ferramentas
Passo "Ferramentas de linha de comando"
$apps = @("git","nodejs","python","gh","7zip","ffmpeg","temurin21-jdk","maven",
          "php83","composer","postgresql","winscp")
foreach ($app in $apps) {
    if (scoop list $app 6>$null | Select-String $app -Quiet) { Ok "$app ja instalado" }
    else { scoop install $app }
}

# ------------------------------------------------------------------ python
Passo "Pacotes Python"
$pacotes = @(
    "pymysql",          # consulta no banco da Lecom
    "openpyxl",         # planilha de levantamento
    "paramiko",         # acesso aos servidores de aplicacao
    "reportlab",        # PDF da documentacao de finalizacao
    "pymupdf",          # conferir o PDF gerado
    "beautifulsoup4",   # raspagem, prova do Roberty
    "requests",
    "faster-whisper",   # transcricao de reuniao
    "nvidia-cublas-cu12","nvidia-cudnn-cu12"   # transcricao na GPU
)
python -m pip install --upgrade pip
python -m pip install @pacotes

# ------------------------------------------------------------------ claude code
Passo "Claude Code"
npm install -g @anthropic-ai/claude-code

# ------------------------------------------------------------------ vscode
Passo "Extensoes do VS Code"
if (Get-Command code -ErrorAction SilentlyContinue) {
    foreach ($ext in @("anthropic.claude-code","github.vscode-github-actions",
                       "ms-azuretools.vscode-containers","tomoki1207.pdf")) {
        code --install-extension $ext --force
    }
} else { Ok "VS Code nao encontrado, instalar antes e rodar de novo" }

# ------------------------------------------------------------------ git
Passo "Identidade do Git"
git config --global user.name  "Fabricio Junio Almeida Dias"
git config --global user.email "fabricio.junio@digihub.com.br"
git config --global init.defaultBranch main
git config --global core.autocrlf true
Ok "commit sai como fabricio.junio@digihub.com.br"

Passo "Conferencia"
foreach ($c in @("git","node","npm","python","java","gh","ffmpeg","claude")) {
    $v = (& $c --version 2>&1 | Select-Object -First 1)
    Write-Host ("    {0,-8} {1}" -f $c, $v)
}

Write-Host "`nFalta fazer na mao:" -ForegroundColor Yellow
@(
 "1. VPN OpenVPN: instalar o cliente e pedir o arquivo .ovpn ao Maycon",
 "2. hosts: apontar git.lecom.com.br, precisa de PowerShell como administrador",
 "3. gh auth login, com a conta fabriciojuniodigihub",
 "4. claude, autenticar e reconectar o Atlassian com atendimento@digihub.com.br",
 "5. Chrome, Teams, Outlook e Roberty Studio",
 "6. copiar a pasta material/ da maquina antiga, ela nao esta no repositorio"
) | ForEach-Object { Write-Host "   $_" }
