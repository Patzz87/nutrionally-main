export function useMeta({title, description, url}) {
  if(typeof document === "undefined") return;
  document.title = title;
  let desc = document.querySelector('meta[name="description"]');
  if(desc) desc.setAttribute("content", description);
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if(ogTitle) ogTitle.setAttribute("content", title);
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if(ogDesc) ogDesc.setAttribute("content", description);
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if(ogUrl) ogUrl.setAttribute("content", url || window.location.href);
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if(twTitle) twTitle.setAttribute("content", title);
  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if(twDesc) twDesc.setAttribute("content", description);
}
