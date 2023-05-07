import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const Redirect = function ({ to, replace }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);

  return null;
};

Redirect.defaultProps = {
  replace: false,
};

Redirect.propTypes = {
  replace: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

export default Redirect;