# dynamodb-multiple-tables-sample
http://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/CodeSamples.html

## インストール

### DynamoDB（ローカル版）

以下からダウンロードする。
http://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.html

```
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

### npm パッケージ

```
$ npm install
```

## ビルド

```
$ npm run build
```

## テーブルの作成

```
$ node src/CreateTable.js
```

## データの追加

```
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://data/ProductCatalog.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://data/Forum.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://data/Thread.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://data/Reply.json
```

問題ない場合は、以下の表示が出る。

```
{
    "UnprocessedItems": {}
}
```

## アイテムのスキャン（全件確認）

```
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name ProductCatalog
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name Forum
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name Thread
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name Reply
```

## アイテムのクエリ（グローバルセカンダリーインデックスを使った）

```
$ node src/QueryItems.js
```

## テーブルの削除

```
$ node src/DeleteTable.js
```
