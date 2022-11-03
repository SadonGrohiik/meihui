import { Context, gql } from "@apollo/client";
import axios from "axios";
export function Q_getProductsByCategory(
  filters: Array<string> = [],
  sort: { field: string; order: string } = { field: "id", order: "desc" }
) {
  const query = `
    data{
        attributes{
          products(
            filters:{
            ${filters.join()}
          }
          sort: "${sort.field}:${sort.order}"
          )
          
          {
            data{
              id,
              attributes{
                Name,
                Price,
                Stock,
                discount,
                slug,
                Details{
                  Name,
                  Value
                }
                Images{
            data{
              attributes{
                thumbnail:url
  
              }
            }
          }
              }
            }
          }
        }
      }
    `;

  return query;
}

export function Q_getProduct(slug: string) {
  return `
  
  products(filters:{
    slug:{
      eq: "${slug}"
    }
  }){
data{
  id,
attributes{
  Name,
  Description,
  Price,
  Stock,
  discount,
  Details{
    id,
    Name,
    Value
  },
  color{
    name,
    hex
  },
  category{
    data{
      id
    }
  }
  Images{
    data{
      id,
      attributes{
        small:url
      }
    }
  }
}
}
}
  `;
}

export function Q_postColor() {}

export function Q_getCart(id: number) {
  return gql`
    # Write your query or mutation here
    query getCart {
      carts(filters: { user: { id: { eq: 1 } } }) {
        data {
          attributes {
            item {
              product {
                data {
                  id
                  attributes {
                    Name
                    Price
                    Images {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
              count
            }
          }
        }
      }
    }
  `;
}

export async function getUserInfo(token: any) {
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.get(
      "http://localhost:1337/api/users/me?populate=deep",
      config
    );
    return res;
  }
}
