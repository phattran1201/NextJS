import { id } from "date-fns/locale";
import moment from "moment";

export async function getListPost(id = null) {
  const res = await fetch(
    id ? `https://dummyjson.com/posts/${id}` : `https://dummyjson.com/posts/`
  );
  let data = await res.json();

  return id
    ? {
        ...data,
        date: moment()
          .add(id * 1000, "d")
          .unix(),
      }
    : data?.posts?.map((v) => ({
        ...v,
        date: moment()
          .add(v.id * 1000, "d")
          .unix(),
      }));
}
