## Getting Started

- 起動

```bash
make start
```

- なんか動かなくなった時の対処法

yarn.lock, node_modules 消してもう一回`yarn install`すると大体治る

### CSS

- [tailwindcss](https://tailwindcss.com/)
- [cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)
- [icon](https://heroicons.com/)
- 一応 css module も一緒に使える

### 状態管理

そこまでアプリ大きくない&そんなにパフォーマンス要求されるわけでもないので、Context で State は管理してる

- https://ja.reactjs.org/docs/context.html

- JWT は cookie の中

- グローバルに持ってるやつ(認証関係)

```js
type User = {
  id: string,
  name: string,
};
```

- 使い方

component 内で

- 取得したい時

```tsx
import { useAuth } from '../context/AuthContext';

const HogeComponent: React.FC = () => {
  const { user } = useAuth();
  return <div>{user.name}</div>;
};
```

- 値に変更加えたい時
  - auth 内に関数定義してるのでそれ経由で(AuthContext.tsx 参照)

### その他

vscode の extention で eslint と prettier 入れてね

### Design

![image](https://user-images.githubusercontent.com/69241625/130506096-a55de645-093b-46df-8dff-c532997fc64b.png)

### 機能要件
