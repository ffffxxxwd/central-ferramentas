#!/bin/bash
# Servidor local — Central de Ferramentas (Organização)
# Mata qualquer processo na porta 8765 e sobe um novo.

PORTA=8765
DIR="/home/v/Downloads/backuppppppppppppppppppp/Organização"

# Mata processo existente na porta, se houver
PID=$(lsof -ti tcp:"$PORTA" 2>/dev/null)
if [ -n "$PID" ]; then
  kill -9 $PID 2>/dev/null
  sleep 0.3
fi

# Sobe o servidor
cd "$DIR"
echo "Servidor rodando em http://localhost:$PORTA"
echo "Pasta: $DIR"
echo ""
echo "Ctrl+C para parar."
python3 -m http.server "$PORTA"
