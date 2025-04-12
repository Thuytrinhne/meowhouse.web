// convert functions are used for convert value. Ex: 1000 -> '1k'
export const getStrOfObj = (obj: object) => {
  const arr = Object.keys(obj);
  let str = "";
  arr.forEach((item: string) => (str += JSON.stringify((obj as any)[item])));
  return str;
};

export const convertBlobUrlsToImgFiles = async (
  imageUrls: string[],
  fileName: string
): Promise<File[]> =>
  Promise.all(
    imageUrls
      .filter((url) => url.startsWith("blob"))
      .map((imageUrl, index) =>
        fetch(imageUrl)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `${fileName}_${index}.webp`, {
                type: "image/webp",
              })
          )
      )
  );

export const convertNumberToVND = (
  amount: number,
  includeUnit: boolean = true
): string => {
  if (isNaN(amount)) {
    return `0${includeUnit ? "đ" : ""}`;
  }

  // Làm tròn lên số tiền
  const roundedAmount = Math.ceil(amount);

  // Định dạng số tiền thành chuỗi có dấu chấm phân cách
  const formattedAmount = roundedAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm đơn vị "đ"
  return `${formattedAmount}${includeUnit ? "đ" : ""}`;
};

export function formatDateTime(dateString: string | Date | undefined): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
}
