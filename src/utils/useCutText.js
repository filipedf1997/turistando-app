export default function useCutText() {
  function cutText(text, size) {
    return text.length > size ? `${text.slice(0, size)}...` : text
  }

  return cutText
}
