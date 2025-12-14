import React, { useState } from "react";
import styles from "./test.module.css";
import { Request } from "./webHook-xhr";

type noteDate = {
  id: number;
  title: string;
  content: string;
  lastUpdate: string;
};

function Test() {
  const Ids: number[] = [];
  const [isSwitch, setIsSwitch] = useState(0);
  refresh();
  function fetchNotes() {
    if (Ids.length === 0) {
      for (let i = 0; i < 10; i++) {
        Ids.push(i + 1);
      }
    }
    const promises = Ids.map((id) => Request("get", `/note/${id}.json`, null));
    // 假设后端传来的数据有`lastUpdate`，即最后更新时间属性
    return Promise.all(promises).then((response) => {
      console.log(response);
      response.sort((a, b) => Number(b.lastUpdate) - Number(a.lastUpdate));
      return response;
    });
  }
  // 刷新
  let notes: any[] = [];
  async function refresh() {
    notes = await fetchNotes();
    const list = document.getElementById("noteList");
    if (list !== null) {
      list.innerHTML = "";
      notes.forEach((note: noteDate) => {
        const item = document.createElement("li");
        const date = new Date(Number(note.lastUpdate));
        item.textContent = `题目: ${note.title}, 内容: ${
          note.content
        }, 最后更新时间: ${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const delbtn = document.createElement("button");
        delbtn.textContent = "删除";
        delbtn.onclick = () => del(note.id);
        const upbtn = document.createElement("button");
        upbtn.textContent = "编辑";
        upbtn.onclick = () => update(note.id);
        list.appendChild(item);
        list.appendChild(delbtn);
        list.appendChild(upbtn);
      });
    }
  }

  async function submit() {
    const id = notes.length + 1;
    Ids.push(id);
    console.log(id);
    const title = document.getElementsByName(
      "title"
    ) as unknown as HTMLInputElement;
    const content = document.getElementsByName(
      "content"
    ) as unknown as HTMLInputElement;
    const data = {
      title: title[0].value,
      content: content[0].value,
      lastUpdate: Date.now().toString(),
    };
    await Request("post", `/note/${id}`, JSON.stringify(data));
    refresh();
  }

  async function del(id) {
    Ids.splice(id - 1, 1);
    await Request("delete", `/note/${id}`);
    refresh();
  }

  async function update(id) {
    console.log(notes[id].title, notes[id].content);
    setIsSwitch(id);
    const title = document.getElementsByName(
      "title"
    ) as unknown as HTMLInputElement;
    title[0].value = notes[id].title;
    const content = document.getElementsByName(
      "content"
    ) as unknown as HTMLInputElement;
    content[0].value = notes[id].content;
  }

  async function onup() {
    const title = document.getElementsByName(
      "title"
    ) as unknown as HTMLInputElement;
    const content = document.getElementsByName(
      "content"
    ) as unknown as HTMLInputElement;
    const data = {
      title: title[0].value,
      content: content[0].value,
      lastUpdate: Date.now().toString(),
    };
    await Request("put", `/note/${isSwitch}`, JSON.stringify(data));
    setIsSwitch(false);
    refresh();
  }

  return (
    <>
      <h3>新增数据</h3>
      <div className={styles.input}>
        <span>题目</span>
        <input type="text" name="title" placeholder="请输入题目" />
        <span>内容</span>
        <textarea name="content" rows={1} placeholder="请输入内容" />
        {isSwitch ? (
          <button onClick={() => onup()}>完成</button>
        ) : (
          <button onClick={() => submit()}>提交</button>
        )}
      </div>
      <button onClick={() => refresh()}>刷新</button>
      <ul id="noteList"></ul>
    </>
  );
}

export default Test;
