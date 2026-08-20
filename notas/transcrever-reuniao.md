# Transcrever reunião e ler as telas da gravação

Tudo roda nesta máquina. Áudio e vídeo de cliente não sobem para serviço nenhum.

## Preparo, uma vez só

O `ffmpeg` veio pelo scoop. O `faster-whisper` já está instalado. Para usar a GPU faltam as
bibliotecas CUDA, que vêm pelo pip:

```
python -m pip install nvidia-cublas-cu12 nvidia-cudnn-cu12
```

A placa é uma GTX 1650 de 4 GB, e o modelo `medium` em `float16` cabe.

## O detalhe que trava

O `ctranslate2` não acha as DLLs sozinho e o erro é `Library cublas64_12.dll is not found`.
As pastas do pip precisam entrar no PATH **antes** de importar o `faster_whisper`:

```python
import os, pathlib, nvidia
raiz = pathlib.Path(nvidia.__path__[0])
for pasta in (raiz / "cublas" / "bin", raiz / "cudnn" / "bin"):
    os.add_dll_directory(str(pasta))
    os.environ["PATH"] = str(pasta) + os.pathsep + os.environ["PATH"]

from faster_whisper import WhisperModel
modelo = WhisperModel("medium", device="cuda", compute_type="float16")
```

Sem GPU, o `medium` no processador não termina em tempo razoável. Vale a pena resolver.

## O caminho

Extrair o áudio em 16 kHz mono, que é o que o whisper quer:

```
ffmpeg -i reuniao.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le audio.wav
```

Transcrever com `language="pt"` e `vad_filter=True`. Escrever com `flush` a cada linha, senão
não dá para acompanhar o andamento.

## Ler as telas

Gravação de reunião é quase sempre a mesma tela por minutos, então frame a cada 20 segundos
já pega tudo:

```
ffmpeg -i reuniao.mp4 -vf "fps=1/20,scale=1600:-1" -q:v 4 frames/f_%03d.jpg
```

Detecção de cena (`select='gt(scene,0.10)'`) não serve aqui: a variação entre um slide e outro
fica abaixo do limiar e não sai frame nenhum.

Para achar o frame de um trecho da transcrição, o índice é `segundos / 20 + 1`.
