const deprecated = require('../lib');

describe('deprecated', () => {
  describe('function flow', () => {
    it('should throw an error for invalid params', () => {
      try {
        deprecated();
      } catch (error) {
        expect(error.message).toEqual('The param obj is required');
      }
    });

    it('should apply the deprecated for a function with custom logger and metrics support', () => {
      const fn = jest.fn();

      const config = {
        logger: {
          warn: jest.fn(),
        },
        message:
          'This function it will deprecated in the next release, more info in https://www.npmjs.com',
        sendMetrics: jest.fn(),
      };

      const params = [{}, 'arg_2', 'arg_3'];

      const deprecatedFn = deprecated(fn, config);

      deprecatedFn(...params);

      expect(config.logger.warn).toHaveBeenCalledWith(config.message);
      expect(config.sendMetrics).toHaveBeenCalled();
      expect(fn).toHaveBeenCalledWith(...params);
    });

    it('should apply the deprecated for a function with default values', () => {
      const fn = jest.fn();
      const warningLogger = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const params = [{}, 'arg_2', 'arg_3'];

      const deprecatedFn = deprecated(fn);

      deprecatedFn(...params);

      expect(warningLogger).toHaveBeenCalledWith(
        'This will be deprecated soon',
      );
      expect(fn).toHaveBeenCalledWith(...params);
    });
  });

  describe('object flow', () => {
    it('should throw an error for invalid method', () => {
      try {
        deprecated({}, { method: 'getUsers' });
      } catch (error) {
        expect(error.message).toEqual('The object not have the method defined');
      }
    });

    it('should apply the deprecated for an object method with custom logger and metrics support', async () => {
      const response = [
        { id: 2, name: 'Matias' },
        { id: 3, name: 'Belen' },
      ];

      const obj = {
        getUsers: jest.fn().mockImplementation(() => Promise.resolve(response)),
      };

      const config = {
        logger: {
          warn: jest.fn(),
        },
        message: 'This method it will deprecated in the next version',
        sendMetrics: jest.fn(),
        method: 'getUsers',
      };

      const deprecatedObjMethod = deprecated(obj, config);

      const users = await deprecatedObjMethod.getUsers();

      expect(config.logger.warn).toHaveBeenCalledWith(config.message);
      expect(config.sendMetrics).toHaveBeenCalled();
      expect(obj.getUsers).toHaveBeenCalled();
      expect(users).toEqual(response);
    });
  });
});
