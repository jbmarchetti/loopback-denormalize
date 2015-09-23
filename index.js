module.exports = function(object, toDenormalize){

  object.observe('before save', function denormalize(ctx, next) {
    var toDenormalizeValues= '';
    var denormalizedJson= {};

    var id = '';

    for (var _class in toDenormalize)
    {

      if (ctx.isNewInstance)
      id = ctx.instance[_class+'Id'];
      else
      id = ctx.data[_class+'Id'];

      object.app.models[_class].findById(id,
        function (err, instance)
        {
          if (err)
          return next();

          for ( var i in toDenormalize[_class] )
          denormalizedJson[toDenormalize[_class][i]] = instance[toDenormalize[_class][i]];
            if (ctx.isNewInstance)
            ctx.instance['_'+_class] = denormalizedJson;
            else
            ctx.data['_'+_class] = denormalizedJson;

          next();
        });
      }
    });
  };
