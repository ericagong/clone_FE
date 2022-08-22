// response.js

const RESP = {
  // auth : login/ logout/ signup
  AUTH: {
    SIGN_UP_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully sign up.",
      },
    },
    SIGN_UP_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Already existing username.",
      },
    },
    LOGIN_HEADER: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXN0bWFuIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjYwMzc0NzYwfQ.md7GkryurbgmfFIjaJtvQEoOm6HqQWCCVrK2FzSqUMc",
    },
    LOGIN_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully logged in.",
      },
    },
    LOGIN_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Not existing email or wrong password.",
      },
    },
    LOGOUT_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully logged out.",
      },
    },
  },

  // post : CRUD, like/unlike
  POST: {
    // post CRUD
    CREATE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully created new post.",
      },
    },
    CREATE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to create new post.",
      },
    },
    CREATE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to create new post. Please login!",
      },
    },
    GET_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get posts.",
      },
      output: {
        currpage: 1,
        totalpage: 3,
        currcontent: 4,
        posts: [
          {
            id: 1,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            imageUrls: [
              "https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?size=626&ext=jpg",
              "https://img.freepik.com/free-photo/landmark-forest-tourism-sunrise-famous-ancient_1417-1194.jpg?size=626&ext=jpg",
              "https://www.freepik.com/free-photos-vectors/rice-field",
            ],
            hashtags: ["#good", "#Good"],
            time: "2022/08/19",
            ismine: true,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 2,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content: "blablablabla. this is content of the post #good #vibe",
            imageUrls: [
              "https://www.freepik.com/free-vector/summer-forest-landscape-with-lake-night_27576496.htm#query=natural%20scenery&position=5&from_view=keyword",
              "https://img.freepik.com/free-photo/fuji-mountain-cherry-blossoms-spring-japan_335224-181.jpg?size=626&ext=jpg&ga=GA1.2.1708058119.1660959040",
            ],
            hashtags: ["#good", "#vibe"],
            time: "2022/08/19",
            ismine: false,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 3,
            username: "Ash",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content:
              "blablablabla. this is content of the post #onlytags #hello",
            imageUrls: [],
            hashtags: ["#onlytags", "#hello"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 4,
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content: "blablablabla. this is content of the post #onlytags",
            imageUrls: [],
            hashtags: ["#onlytags"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 5,
            username: "test1",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content: "blablablabla. this is content of the post.",
            imageUrls: [],
            hashtags: [],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
        ],
      },
    },
    GET_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to get posts. Wrong page number.",
      },
    },
    EDIT_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly edited post.",
      },
      output: {
        id: 1,
        username: "erica",
        userprofile: "https://joeschmoe.io/api/v1/jane",
        content: "blablablabla. this is content of the post #good #Good",
        imageUrls: [
          "https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?size=626&ext=jpg",
          "https://img.freepik.com/free-photo/landmark-forest-tourism-sunrise-famous-ancient_1417-1194.jpg?size=626&ext=jpg",
          "https://www.freepik.com/free-photos-vectors/rice-field",
        ],
        hashtags: ["#good", "#Good"],
        time: "2022/08/19",
        ismine: true,
        isliked: true,
        isfollowing: true,
        numcomments: 5,
        numlikes: 10,
      },
    },
    EDIT_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to edit post.",
      },
    },
    EDIT_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to edit post.",
      },
    },
    DELETE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly deleted post.",
      },
    },
    DELETE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Already deleted post.",
      },
    },
    DELETE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to delete post.",
      },
    },

    // TODO consider concurrency!
    // post like/dislike
    LIKE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly liked post.",
      },
    },
    LIKE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Already deleted post.",
      },
    },
    LIKE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to like the post. Please login.",
      },
    },
    UNLIKE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly unliked post.",
      },
    },
    UNLIKE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Already deleted post.",
      },
    },
    UNLIKE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to unlike the post. Please login.",
      },
    },
  },

  // comment : comment CRUD
  COMMENT: {
    // post CRUD
    CREATE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully created new comment.",
      },
    },
    CREATE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to create new comment.",
      },
    },
    GET_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get comments.",
      },
      output: {
        currpage: 1,
        totalpage: 3,
        currcontent: 4,
        totalelements: 5,
        comments: [
          {
            id: 1,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            ismine: true,
          },
          {
            id: 2,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            ismine: false,
          },
          {
            id: 3,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            ismine: true,
          },
          {
            id: 4,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #vibe",
            ismine: true,
          },
          {
            id: 5,
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #hello",
            ismine: false,
          },
        ],
      },
    },
    GET_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to get comments. Wrong page number.",
      },
    },
    EDIT_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly edited comment.",
      },
      output: {
        id: 5,
        username: "john",
        userprofile: "https://joeschmoe.io/api/v1/jane",
        content: "blablablabla. this is content of the post #good #hello",
        ismine: false,
      },
    },
    EDIT_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to edit comment.",
      },
    },
    EDIT_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to edit comment.",
      },
    },
    DELETE_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Succesfullly deleted comment.",
      },
    },
    DELETE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Already deleted comment.",
      },
    },
    DELETE_FAIL_AUTH: {
      result: false,
      status: {
        code: 401,
        message: "No Right to delete comment.",
      },
    },
  },

  // search : get serachresult
  SEARCH: {
    GET_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get posts.",
      },
      output: {
        currpage: 1,
        totalpage: 1,
        currcontent: 4,
        posts: [
          {
            id: 1,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            imageUrls: [
              "https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?size=626&ext=jpg",
              "https://img.freepik.com/free-photo/landmark-forest-tourism-sunrise-famous-ancient_1417-1194.jpg?size=626&ext=jpg",
              "https://www.freepik.com/free-photos-vectors/rice-field",
            ],
            hashtags: ["#good", "#Good"],
            time: "2022/08/19",
            ismine: true,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 2,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content: "blablablabla. this is content of the post #good #vibe",
            imageUrls: [
              "https://www.freepik.com/free-vector/summer-forest-landscape-with-lake-night_27576496.htm#query=natural%20scenery&position=5&from_view=keyword",
              "https://img.freepik.com/free-photo/fuji-mountain-cherry-blossoms-spring-japan_335224-181.jpg?size=626&ext=jpg&ga=GA1.2.1708058119.1660959040",
            ],
            hashtags: ["#good", "#vibe"],
            time: "2022/08/19",
            ismine: false,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 3,
            username: "Ash",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content:
              "blablablabla. this is content of the post #onlytags #hello #good",
            imageUrls: [],
            hashtags: ["#onlytags", "#hello", "#good"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 4,
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            content:
              "blablablabla. this is content of the post #onlytags #good",
            imageUrls: [],
            hashtags: ["#onlytags, #good"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
        ],
      },
    },
    GET_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "Fail to get posts. Wrong page number.",
      },
    },
  },

  // rank : hashtag rank
  RANK: {
    GET_INIT: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get hashtag rank.",
      },
      output: {
        hashtags: [],
      },
    },
    GET_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get hashtag rank.",
      },
      output: {
        hashtags: [
          ["#good", 3],
          ["#notags", 3],
          ["#hello", 1],
        ],
      },
    },
  },

  // follow: follow, unfollow
  FOLLOW: {
    FOLLOW_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Follow username.",
      },
    },
    FOLLOW_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to follow.",
      },
    },
    UNFOLLOW_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Unfollow username.",
      },
    },
    UNFOLLOW_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to unfollow.",
      },
    },
  },

  // profile: get info, posts, following, follower list.
  PROFILE: {
    GET_INFO_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get info.",
      },
      output: {
        username: "erica",
        userprofile: "https://joeschmoe.io/api/v1/jane",
        numposts: 10,
        numfollowing: 100,
        numfollowers: 10,
      },
    },
    GET_INFO_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to get profile info.",
      },
    },
    GET_POSTS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get posts.",
      },
      output: {
        currpage: 1,
        totalpage: 3,
        currcontent: 4,
        isme: false,
        posts: [
          {
            id: 1,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/eunchae",
            content: "blablablabla. this is content of the post #good #Good",
            imageUrls: [
              "https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?size=626&ext=jpg",
              "https://img.freepik.com/free-photo/landmark-forest-tourism-sunrise-famous-ancient_1417-1194.jpg?size=626&ext=jpg",
              "https://www.freepik.com/free-photos-vectors/rice-field",
            ],
            hashtags: ["#good", "#Good"],
            time: "2022/08/19",
            ismine: true,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 2,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/eunchae",
            content: "blablablabla. this is content of the post #good #vibe",
            imageUrls: [
              "https://www.freepik.com/free-vector/summer-forest-landscape-with-lake-night_27576496.htm#query=natural%20scenery&position=5&from_view=keyword",
              "https://img.freepik.com/free-photo/fuji-mountain-cherry-blossoms-spring-japan_335224-181.jpg?size=626&ext=jpg&ga=GA1.2.1708058119.1660959040",
            ],
            hashtags: ["#good", "#vibe"],
            time: "2022/08/19",
            ismine: false,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 3,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/eunchae",
            content:
              "blablablabla. this is content of the post #onlytags #hello",
            imageUrls: [],
            hashtags: ["#onlytags", "#hello"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 4,
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/eunchae",
            content: "blablablabla. this is content of the post #onlytags",
            imageUrls: [],
            hashtags: ["#onlytags"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 5,
            username: "test1",
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/eunchae",
            imageUrls: [],
            hashtags: [],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
        ],
      },
    },
    GET_MY_POSTS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get posts.",
      },
      output: {
        currpage: 1,
        totalpage: 3,
        currcontent: 4,
        isme: true,
        posts: [
          {
            id: 1,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #Good",
            imageUrls: [
              "https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?size=626&ext=jpg",
              "https://img.freepik.com/free-photo/landmark-forest-tourism-sunrise-famous-ancient_1417-1194.jpg?size=626&ext=jpg",
              "https://www.freepik.com/free-photos-vectors/rice-field",
            ],
            hashtags: ["#good", "#Good"],
            time: "2022/08/19",
            ismine: true,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 2,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #good #vibe",
            imageUrls: [
              "https://www.freepik.com/free-vector/summer-forest-landscape-with-lake-night_27576496.htm#query=natural%20scenery&position=5&from_view=keyword",
              "https://img.freepik.com/free-photo/fuji-mountain-cherry-blossoms-spring-japan_335224-181.jpg?size=626&ext=jpg&ga=GA1.2.1708058119.1660959040",
            ],
            hashtags: ["#good", "#vibe"],
            time: "2022/08/19",
            ismine: false,
            isliked: true,
            isfollowing: true,
            numcomments: 5,
            numlikes: 10,
          },
          {
            id: 3,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content:
              "blablablabla. this is content of the post #onlytags #hello",
            imageUrls: [],
            hashtags: ["#onlytags", "#hello"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 4,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post #onlytags",
            imageUrls: [],
            hashtags: ["#onlytags"],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
          {
            id: 5,
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/jane",
            content: "blablablabla. this is content of the post.",
            imageUrls: [],
            hashtags: [],
            time: "2022/08/19",
            ismine: false,
            isliked: false,
            isfollowing: false,
            numcomments: 0,
            numlikes: 0,
          },
        ],
      },
    },
    GET_POSTS_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to get posts.",
      },
    },
    GET_FOLLOWINGS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get following list.",
      },
      output: {
        currpage: 1,
        totalpage: 2,
        currcontent: 5,
        totalelements: 50,
        isme: false,
        following: [
          {
            username: "maybe",
            userprfoile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
          {
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 10,
          },
          {
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 50,
            numfollowers: 30,
          },
          {
            username: "test1",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 0,
            numfollowers: 0,
          },
          {
            username: "test2",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
        ],
      },
    },
    GET_MY_FOLLOWINGS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get following list.",
      },
      output: {
        currpage: 1,
        totalpage: 2,
        currcontent: 5,
        totalelements: 50,
        isme: true,
        following: [
          {
            username: "maybe",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
          {
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 10,
          },
          {
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 50,
            numfollowers: 30,
          },
          {
            username: "test1",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 0,
            numfollowers: 0,
          },
          {
            username: "test2",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
        ],
      },
    },
    GET_FOLLOWINGS_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to get following list.",
      },
    },
    GET_FOLLOWERS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get follower list.",
      },
      output: {
        currpage: 1,
        totalpage: 2,
        currcontent: 5,
        totalelements: 50,
        isme: false,
        followers: [
          {
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
          {
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 10,
          },
          {
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 50,
            numfollowers: 30,
          },
          {
            username: "test1",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 0,
            numfollowers: 0,
          },
          {
            username: "test2",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
        ],
      },
    },
    GET_MY_FOLLOWERS_SUCCESS: {
      result: true,
      status: {
        code: 200,
        message: "Successfully get follower list.",
      },
      output: {
        currpage: 1,
        totalpage: 2,
        currcontent: 5,
        isme: true,
        totalelements: 50,
        followers: [
          {
            username: "erica",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
          {
            username: "Eunchae",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 10,
          },
          {
            username: "john",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 50,
            numfollowers: 30,
          },
          {
            username: "test1",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 0,
            numfollowers: 0,
          },
          {
            username: "test2",
            userprofile: "https://joeschmoe.io/api/v1/random",
            numfollowing: 5,
            numfollowers: 16,
          },
        ],
      },
    },
    GET_FOLLOWERS_FAIL: {
      result: false,
      status: {
        code: 401,
        message: "No right to get follower list.",
      },
    },
  },
};

export default RESP;
