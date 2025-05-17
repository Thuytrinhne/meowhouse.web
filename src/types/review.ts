interface Review {
  _id: number;
  user_id: string;
  user_name: string;
  user_avt: string;
  review_date: string;
  variant_name: string;
  review_content: string;
  review_imgs: string[];
  review_vids: string[];
  rating_point: number;
}
