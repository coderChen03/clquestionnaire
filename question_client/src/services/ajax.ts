const HOST = "http://localhost:3001";

export const get = async (url: string) => {
  return (await fetch(`${HOST}${url}`)).json();
};

export const post = async (url: string, body: any) => {
  return (
    await fetch(`${HOST}${url}`, {
      method: "post",
      body: JSON.stringify(body),
    })
  ).json();
};
