function f2(message: unknown) {
  if (typeof message === 'string') {
    return message.length;
  } else {
    return message;
  }
}

f2(undefined);
