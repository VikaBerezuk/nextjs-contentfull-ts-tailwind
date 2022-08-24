import React from 'react';
import {IArticle, IHomeFields} from "../../contentful";
import Head from "next/head";
import {GetStaticPaths, GetStaticProps} from "next";
import client from "../../Contentful";
import {IArticleFields, IArticle} from "../../contentful";

export default function Article(page: IArticle) {
    return (
        <>
            <Head>
                <title>{page.fields.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>{page.fields.title}</h1>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const articleEntries = await  client.getEntries<IArticleFields>({
        content_type: 'article',
        select: 'fields.slug'
    })

    return {
        paths: articleEntries.items.map(item =>  {
            return {
                params: {
                    article: item.fields.slug
                }
            }
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params.article;

  const articleEntries = await  client.getEntries<IArticleFields>({
      content_type: 'article',
      limit: 1,
      'fields.slug': slug
  })

    const [article] = articleEntries.items;
    return {
        props: {
           article
        },
    }
}