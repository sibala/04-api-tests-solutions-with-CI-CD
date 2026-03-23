import { describe, test, expect, beforeEach, vi } from "vitest";

describe("app integration", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("fetch", vi.fn());
    document.body.innerHTML = `
      <main class="container">
        <h1>Inlägg</h1>
        <select id="tag-filter"><option value="">Alla</option></select>
        <div id="post-list"></div>
      </main>
    `;
  });  

//   test("Just a demonstration of a real API call, and its drawbacks compared to Mocked API calls", async () => {
//     let posts = [
//         {
//             "id": 1,
//             "title": "His mother had always taught him",
//             "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//             "tags": [
//                 "history",
//                 "american",
//                 "crime"
//             ],
//             "reactions": {
//                 "likes": 192,
//                 "dislikes": 25
//             },
//             "views": 305,
//             "userId": 121
//         }
//     ]

//     const { fetchPosts } = await import("../../src/api-service.js");
//     let result = await fetchPosts();

//     expect(result.posts).toEqual(
//         expect.arrayContaining(posts)
//     );
//   })

  test("fetchPosts returns posts from API", async () => {
    let postData = { posts: [{ id: 1, title: "Test" }] };
   
    fetch.mockResolvedValueOnce({ 
        ok: true, 
        json: async () => postData 
    });

    const { fetchPosts } = await import("../../src/api-service.js");
    let result = await fetchPosts();

    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/posts");
    expect(result).toEqual(postData);
  });
});