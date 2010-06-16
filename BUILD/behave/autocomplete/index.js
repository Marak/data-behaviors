debug.log(options);

$(options.selector).autocomplete({
  source: options.data
});