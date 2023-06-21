import {defineType} from 'sanity'

export default defineType({
  name: 'recomm_product',
  title: 'Remix-ecomm__Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'stripeProductId',
      title: 'Stripe Product Id',
      type: 'document',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
})