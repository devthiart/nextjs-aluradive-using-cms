const TOKEN = process.env.DATO_TOKEN;
const BASE_ENDPOINT = 'https://graphql.datocms.com/';
const PREVIEW_ENDPOINT = `${BASE_ENDPOINT}/preview`; // URL to see unpublished changes to the CMS

const globalQuery = `
  query {
    globalFooter {
      description
    }
  }
`;

export async function cmsService({ query, preview }) {

  const ENDPOINT = preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;

  try {
    const pageContentResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query,
      })
    })
    .then(async (serverResponse) => {
      const body = await serverResponse.json();
      
      if(!body.errors) {
        return body;
      }
  
      throw new Error(JSON.stringify(body));
    });
  
    // console.log('PageContentResponse: ', pageContentResponse);

    const globalContentResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query: globalQuery,
      })
    })
    .then(async (serverResponse) => {
      const body = await serverResponse.json();
      
      if(!body.errors) {
        return body;
      }
  
      throw new Error(JSON.stringify(body));
    });
    
    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...globalContentResponse.data
        }
      }
    }
  } 
  catch(error) {
    throw new Error(error.message);
  }
  
}
