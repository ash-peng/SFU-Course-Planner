FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip setuptools wheel
WORKDIR /app/backend
COPY requirements.txt .
COPY todo/build_cfunc.py todo/cfunc.c ./todo/

RUN apt-get update \
  && apt-get install -y build-essential gcc g++ clang \
  && apt-get install libffi-dev \
  && apt-get install libssl-dev
RUN pip install -r requirements.txt
RUN python ./todo/build_cfunc.py
COPY . .

CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]
EXPOSE 8000
