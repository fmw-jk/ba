define [ 'backbone' ], ( Backbone )->
  Backbone.Model.extend
    defaults:
      field: ''
      type:  'includes'
      value: ''
      link:  ''

    complies: ( number, test )->
      return null if !@get 'value'
      fieldsOfInterest = @getFieldsOfInterest test
      comparator = do @getComparator
      return comparator.call @, fieldsOfInterest

    getFieldsOfInterest: ( test )->
      robot     = test.get 'robot'
      algorithm = test.get 'algorithm'
      scenario  = test.get 'scenario'

      switch @get 'field'
        when 'any'       then [ robot, algorithm, scenario ]
        when 'robot'     then [ robot ]
        when 'algorithm' then [ algorithm ]
        when 'scenario'  then [ scenario ]
        else
          console.warn 'Invalid filter field', @get 'field'
          []

    getComparator: ->
      type = @get 'type'
      if type == 'includes'
        return @includesComparator
      if type == 'excludes'
        return @excludesComparator
      return false

    includesComparator: ( fields )->
      value = @get 'value'
      for field in fields
        return true if field.indexOf( value ) > -1
      return false

    excludesComparator: ( fields )->
      value = @get 'value'
      for field in fields
        return false if field.indexOf( value ) > -1
      return true

    #evaluate: ->
      #value  = criteria.get 'value'
      #type   = criteria.get 'type'
      #link   = criteria.get 'link'
      #field  = criteria.get 'field'
      #fields = affectedFields field

      ##if value == 'dwa'
        ##console.log fields, value, type
        ##throw 'he'
      #result = comparator( fields, value, type )
      #nextResult = evaluate index+1
      #return result if result == null or nextResult == null

      #if link == 'and'
        #return result and nextResult
      #if link == 'or'
        #return result or nextResult
      #return result
