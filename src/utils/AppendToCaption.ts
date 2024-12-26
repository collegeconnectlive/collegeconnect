export default function updateCaption(
  caption: string,
  ig: string,
  snap: string
): string {
  // Regular expressions to find existing Instagram and Snapchat mentions
  const igRegex = /Instagram:\s*@\S+/i;
  const snapRegex = /Snapchat:\s*@\S+/i;
  if (ig !== "" || snap !== "") caption += `\n`;
  // Replace or append Instagram handle
  if (ig !== "") {
    if (igRegex.test(caption)) {
      caption = caption.replace(igRegex, `Instagram: @${ig}`);
    } else {
      caption += `\nInstagram: @${ig}`;
    }
  }

  // Replace or append Snapchat handle
  if (snap !== "") {
    if (snapRegex.test(caption)) {
      caption = caption.replace(snapRegex, `Snapchat: @${snap}`);
    } else {
      caption += `\nSnapchat: @${snap}`;
    }
  }
  return caption;
}
