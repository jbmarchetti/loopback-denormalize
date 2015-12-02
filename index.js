module.exports = function(object, toDenormalize){

  object.observe('before save', function denormalize(ctx, next) {
    var toDenormalizeValues= '';
    var denormalizedJson= {};

    var id = '';

    if (ctx.isNewInstance)
    id = ctx.instance.id;
    else
    id = ctx.data.id;

    var includes= [];

    for (var _class in toDenormalize)
    includes.push(_class);


    object.findById(id, {
      include: includes
    },
    function (err, instance)
    {

      if (err || !instance)
      return next();

      var obj = instance.toJSON();
      for (var fieldName in toDenormalize)
      {
        denormalizedJson= {};

        var field = toDenormalize[fieldName];

        for ( var i in field.attributes )
        {
          var attr = field.attributes[i];

          /* Denormalize HasMany Relations */
          if (toDenormalize[fieldName].type === 'hasMany')
          {
            for( var j in obj[fieldName])
            {
              if (!denormalizedJson[j])
              denormalizedJson[j] = {};

              denormalizedJson[j][attr] = obj[fieldName][j][attr];
            }
          }
          /* Denormalize HasOne Relations */
          else
          {
            if (obj[fieldName])
            denormalizedJson[attr] = obj[fieldName][attr];


          }

        }

        if (toDenormalize[fieldName].type === 'hasMany')
          var my_data = Object.keys(denormalizedJson).map(function (key) {
            return denormalizedJson[key];
          });
          else {
            var my_data  = denormalizedJson;
          }

        if (ctx.isNewInstance)
        ctx.instance['_'+fieldName] = my_data;
        else
        ctx.data['_'+fieldName] = my_data;



      }

      next();

    });

  });
};
