# dynamodb-multiple-tables-sample
http://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/CodeSamples.html

## インストール

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
$ cd data
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://ProductCatalog.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://Forum.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://Thread.json
$ aws dynamodb batch-write-item --endpoint-url http://localhost:8000 --request-items file://Reply.json
```

問題ない場合は、以下の表示が出る。

```
{
    "UnprocessedItems": {}
}
```

## アイテムのスキャン（全件確認）

```
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name Forum
```

## アイテムのクエリ（グローバルセカンダリーインデックスを使った）

```
$ aws dynamodb scan --endpoint-url http://localhost:8000 --table-name Forum
```

## テーブルの削除

```
$ node src/CreateTable.js
```
