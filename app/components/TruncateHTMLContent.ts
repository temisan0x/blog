export const truncateHTMLContent: (html: string, maxLength: number) => string = (
    html: string,
    maxLength: number
  ): string => {
    if (!html) {
      return "";
    }
  
    const truncatedHTML = html.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
  
    if (truncatedHTML.length <= maxLength) {
      return html;
    }
  
    const truncatedText = truncatedHTML.slice(0, maxLength) + "...";
    return truncatedText;
  };