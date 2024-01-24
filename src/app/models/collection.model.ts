export interface Collection {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  items: Item[];
  creatorName: string;
  customString1Name: string | null;
  customString2Name: string | null;
  customString3Name: string | null;
  customInt1Name: string | null;
  customInt2Name: string | null;
  customInt3Name: string | null;
  customText1Name: string | null;
  customText2Name: string | null;
  customText3Name: string | null;
  customBool1Name: string | null;
  customBool2Name: string | null;
  customBool3Name: string | null;
  customDate1Name: string | null;
  customDate2Name: string | null;
  customDate3Name: string | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  tags: Tag[];
  customString1Name: string | null;
  customString2Name: string | null;
  customString3Name: string | null;
  customInt1Name: string | null;
  customInt2Name: string | null;
  customInt3Name: string | null;
  customText1Name: string | null;
  customText2Name: string | null;
  customText3Name: string | null;
  customBool1Name: string | null;
  customBool2Name: string | null;
  customBool3Name: string | null;
  customDate1Name: string | null;
  customDate2Name: string | null;
  customDate3Name: string | null;
}

export interface Tag {
  name: string;
}

export interface NewCollection {
  name: string;
  description: string;
  image: File;
  categoryId: number;
  customString1Name?: string;
  customString2Name?: string;
  customString3Name?: string;
  customInt1Name?: string;
  customInt2Name?: string;
  customInt3Name?: string;
  customText1Name?: string;
  customText2Name?: string;
  customText3Name?: string;
  customBool1Name?: string;
  customBool2Name?: string;
  customBool3Name?: string;
  customDate1Name?: string;
  customDate2Name?: string;
  customDate3Name?: string;
}

export interface NewItem {
  name: string;
  tags: ItemTag[];
  customString1Value?: string;
  customString2Value?: string;
  customString3Value?: string;
  customInt1Value?: string;
  customInt2Value?: string;
  customInt3Value?: string;
  customText1Value?: string;
  customText2Value?: string;
  customText3Value?: string;
  customBool1Value?: string;
  customBool2Value?: string;
  customBool3Value?: string;
  customDate1Value?: string;
  customDate2Value?: string;
  customDate3Value?: string;
}

export interface ItemTag {
  name: string;
}
