# loopback-denormalize
Module for denormalizing association attributes in loopback mongodb models


## Install
1. Add `"loopback-denormalize": "latest"` to your `package.json` file then run `npm install` OR run `npm install loopback-denormalize`
2. Set the module in your Entity.js

**Sample: Product with many tags and on category.**

     require('loopback-denormalize')(Product,
     {
        tags: { attributes: ['id', 'text'], type: 'hasMany' },
        category: { attributes: ['id', 'title'], type: 'hasOne' }
     });
3. See the results

**GET product.json**

     {
        id: ....,
        title: ....,
        _tags:[{ id:'dsgsdg', text:'tag1'}, { id:'fsfsffff', text:'tag2'}],
        _category:{ id:'dsgsdg', title:'My Category'}
     }

## Info

**Methods added to your entity**

1. Before Save observer who automatically denormalize fields
2. Refresh remote method `entities/denormalize/:id`

Sample: http://mysite/api/products/denormalize/565f69bbd3810ed01977cdf1.

Enjoy ;)
