# Underline
>>ReactJS 연습을 위한 일일 커밋 프로젝트입니다. 아주 소소하고 사사로운 개인 프로젝트입니다. 책을 보다 밑줄을 긋고 싶은데 책이 훼손되는것을 싫어한 나를 위해 텍스트로 저장할 수 있는 도구입니다. 좀 더 설명을 하자면, 유저스토리북 이라는 서비스를 좋아하고 사용하고 있습니다. 유저스토리북은 내가 읽고 있는 책, 소장한 책들, 그리고 그것들에 대한 메모와 밑줄, 더불어 책을 둘러싼 관계들을 만들어 갈 수 있는 서비스입니다. 그런데 유저스토리북의 여러 기능중에서 제가 거의 유일하게 사용하는 기능이 밑줄긋기입니다. 그래서 평소에 밑줄긋기에만 집중된 앱을 만들어보고 싶었습니다. 말하자면 유저스토리북의 자식이라고 볼 수 도 있겠네요.

# 목표
- 매일 한 줄 이상 커밋을 합니다.
- 혼자 쓰더라도 실제로 작동되는 서비스로 만드는것이 목표입니다. 뭐 혼자 쓰더라도 괜찮습니다. 어차피 상당히 개인적인 도구일 것이기 때문입니다.
- 리액트 + 리덕스를 능숙하게 다룰 수 있기를 희망합니다. 좀 더 욕심을 부린다면 React Native ...
- 어느정도 구조적인 완성도가 마련된 이후에는 private 공간에서 커밋을 이어갈 예정입니다.

# 관련기술
## [create-react-app](https://github.com/facebookincubator/create-react-app)
>> 빌드 구성에 신경쓰지 않고 매우 빠르게 리액트 기본앱을 시작할 수 있도록 도와줍니다. 많이 쓰는 의존성 도구들이 내장되어있습니다. 요약하면,
- [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
- [Babel](http://babeljs.io/) with ES6 and extensions used by Facebook (JSX, object spread, class properties)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ESLint](http://eslint.org/)
- [Jest](http://facebook.github.io/jest)
- and others.

## Router
라우터는 [React-router4](https://github.com/ReactTraining/react-router)를 사용합니다. 4베타를 사용하다가, 얼마전 4 정식버전이 나와서 업그레이드 했습니다. 하는 김에 firebase 로그인과 함께 구현한 샘플([react-router-firebase-auth](https://github.com/tylermcginnis/react-router-firebase-auth))을 참고했습니다. 리액트 라우터4에 대한 다양한 예제코드는 [ReactTraining](https://reacttraining.com/react-router/web/guides/quick-start)을 참고하는게 좋습니다. 정말 자료들은 무궁무진합니다.

## 폴더구조
처음에는 create-react-app의 기본구조에서 [velopert 님의 강의](https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/)에서 소개하는 구조를 바탕으로 시작했습니다. 아래와 같은 형식이었습니다. 가장 일반적인 구조가 일듯 싶습니다. [Redux Book](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)도 비슷한 구조를 하고 있습니다.

```
  my-app/
    README.md
    index.js
    logo.svg
    node_modules/
    package.json
    .gitignore
    public/
      favicon.ico
      index.html
    src/
      actions/
        ActionTypes.js
        index.js
      components/
        App.js
        Component.js
      reducers/
        component.js
        index.js
      css/
        app.css
```
이 구조의 단점은 조금만 개발이 진행되면 Component들이 급속히 많아진다는 것입니다. 그리고 한 컴포넌트를 수정하기 위해서 네 개의 폴더(actions, components,, reducers, css)에 걸쳐있는 파일들을 찾아 열어야 합니다. 그래서 [marmelab](https://marmelab.com/blog/2015/12/17/react-directory-structure.html) 이런 단점을 극복할 수 있는 구조를 제안했습니다. 저도 점점 규모가 커지면서 새로운 구조로 바꾸었습니다. 아래와 같습니다.

```
my-app/
  README.md
  index.js
  logo.svg
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
  src/
    app/
        Header.js
        Sidebar.js
        App.js
        reducers.js
        routes.js
    command/
        Command.js
        CommandContainer.js
        CommandActions.js
        CommandList.js
        CommandItem.js
        CommandHelper.js
        commandReducer.js
    product/
        Product.js
        ProductContainer.js
        ProductActions.js
        ProductList.js
        ProductItem.js
        ProductImage.js
        productReducer.js
    user/
        User.js
        UserContainer.js
        UserActions.js
        UserProfile.js
        UserAvatar.js
        userReducer.js
```
[marmelab](https://marmelab.com/blog/2015/12/17/react-directory-structure.html)는 더 나아가 help나 테스트 코드도 컴포넌트별로 한 폴더에 넣는것을 권장합니다. 물론 이 글도 이미 1년이 더 지난 글이기 때문에 그 사이에 더 좋은 방법이 소개되었을지도 모르겠습니다. 아무튼 꽤 괜찮은 방법인것 같아 규모가 더 커지기 전에 빨리 바꾸었습니다.

# firebase
리액트를 공부하고자 하는 목적이 큰 프로젝트이므로 서버사이드의 비용을 최소한으로 하고자 인증과 디비, 비즈니스 로직을 한번에 해결할 수 있는 firebase를 도입했습니다. 아까 언급했듯이 라우터와도 궁합이 나쁘지 않습니다.([react-router-firebase-auth](https://github.com/tylermcginnis/react-router-firebase-auth))

# 그리고
첫 삽을 뜬 날이 언제인지 보았더니 작년(2016년) 12월 27일이네요. 매일 꼬박꼬박은 못했지만 꽤 꾸준히 진행하고 있습니다. 언제까지 할 수 있을까 걱정은 되지만, 꾸준히 계속 해볼 생각입니다. 프로젝트 진행이 궁금하시면 Watch를 눌러주시고 별을 눌러주신다면 큰 힘이 됩니다. 궁금한점이 있다면 이슈를 남겨주시거나 guruahn@gmail.com 으로 연락주십시요.
