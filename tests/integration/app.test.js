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

  test("fetchPosts calls the correct URL and returns posts", async () => {
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

  test("fetchTags calls the correct URL and returns tags", async () => {
    let tagData = [
      {"slug": "history", "name": "History", "url": "https://dummyjson.com/posts/tag/history"},
      {"slug": "crime", "name": "Crime", "url": "https://dummyjson.com/posts/tag/crime"}
    ];
   
    fetch.mockResolvedValueOnce({ 
        ok: true, 
        json: async () => tagData 
    });

    const { fetchTags } = await import("../../src/api-service.js");
    let result = await fetchTags();

    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/posts/tags");
    expect(result).toEqual(tagData);
  });

  test("fetchPostsByTag calls the correct URL with the tag slug", async () => {
    let postData = { posts: [
      {"id": 1,"title": "Title","body": "Text","tags": ["history",],"reactions": {"likes": 192,"dislikes": 25},"views": 305,"userId": 121}
    ]};
   
    fetch.mockResolvedValueOnce({ 
        ok: true, 
        json: async () => postData 
    });

    const { fetchPostsByTag } = await import("../../src/api-service.js");
    const selectedTag = "history"
    let result = await fetchPostsByTag(selectedTag);

    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/posts/tag/" + selectedTag);
    expect(result).toEqual(postData);
  });


  test("Full flow: fetch posts → store in model → render in view → verify DOM", async () => {
    let postData = { posts: [
      {"id": 1,"title": "First title","body": "Text","tags": ["history",],"reactions": {"likes": 192,"dislikes": 25},"views": 305,"userId": 121},
      {"id": 2,"title": "Second title","body": "Text","tags": ["history",],"reactions": {"likes": 192,"dislikes": 25},"views": 305,"userId": 121}
    ]};
   
    fetch.mockResolvedValueOnce({ 
        ok: true, 
        json: async () => postData 
    });

    const { fetchPosts } = await import("../../src/api-service.js");
    const { AppModel } = await import("../../src/app-model.js");
    const { renderPosts } = await import("../../src/app-view.js");
    
    const model = new AppModel()
    let data = await fetchPosts();
    model.posts = data.posts
    renderPosts(model.posts);

    const list = document.getElementById('post-list')
    expect(list.querySelectorAll('.post-card').length).toBe(2);
    expect(list.querySelector('.post-card h3').textContent).toBe("First title");
    expect(list.querySelector('.post-card:nth-child(2) h3').textContent).toBe("Second title");
  });


  test("Populate the tags filter dropdown with the API call fetchTags()", async () => {
    let tagData = [
      {"slug": "history", "name": "History", "url": "https://dummyjson.com/posts/tag/history"},
      {"slug": "crime", "name": "Crime", "url": "https://dummyjson.com/posts/tag/crime"}
    ];
   
    fetch.mockResolvedValueOnce({ 
        ok: true, 
        json: async () => tagData 
    });

    const { fetchTags } = await import("../../src/api-service.js");
    const { AppModel } = await import("../../src/app-model.js");
    const { renderTags } = await import("../../src/app-view.js");
    
    const model = new AppModel()
    model.tags = await fetchTags();
    renderTags(model.tags, () => {});

    const tagFilterDropdown = document.getElementById('tag-filter')
    expect(tagFilterDropdown.children.length).toBe(3);
    expect(tagFilterDropdown.children[0].textContent).toBe("Alla");
    expect(tagFilterDropdown.children[1].textContent).toBe("History");
    expect(tagFilterDropdown.children[2].textContent).toBe("Crime");
  });
});