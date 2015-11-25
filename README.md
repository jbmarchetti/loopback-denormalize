# loopback-denormalize
Module for denormalizing association attributes in loopback mongodb models

# How to use

Sample: Product with many tags and on category.

In Product.js:
require('loopback-denormalize')(Product,
  {
    tags: { attributes: ['id', 'text'], type: 'hasMany' },
    category: { attributes: ['id', 'title'], type: 'hasOne' }
  });

Results:

GET product.json
{
  id: ....,
  title: ....,
  _tags:[{ id:'dsgsdg', text:'tag1'}, { id:'fsfsffff', text:'tag2'}],
  _category:{ id:'dsgsdg', title:'My Category'}
}
